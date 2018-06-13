using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ZipLink.Repo;
using ZipLink.Data;
using Microsoft.AspNetCore.Identity;
using ZipLink.Service;
using System.Linq;
using System;
using System.Collections.Generic;

namespace ZipLink.Test
{
    [TestClass]
    public class LinkServiceTest
    {
        private static DbContextOptions<ApplicationDbContext> dbContextOptions = null;
        private static ILinkService linkService = null;
        private static IIdentityUserService userService = null;
        private List<string> addedUserNames = new List<string>();

        [ClassInitialize]
        public static void Class_Initialize(TestContext testContext)
        {
            dbContextOptions = new DbContextOptionsBuilder<ApplicationDbContext>()
                                .UseInMemoryDatabase(databaseName: "LinkTestDb")
                                .Options;

            var linkRepository = new Repository<Link>(new ApplicationDbContext(dbContextOptions));
            userService = new TestIdentityUserService(new ApplicationDbContext(dbContextOptions));
            linkService = new LinkService(linkRepository, userService);
        }

        [Ignore]
        public void Add_test_user(string userName = "test", bool setAsCurrent = true)
        {
            if (addedUserNames.Contains(userName))
                userName = userName + "1";
            addedUserNames.Add(userName);

            using (var context = new ApplicationDbContext(dbContextOptions))
            {
                context.Users.Add(new IdentityUser() { UserName = userName });
                context.SaveChanges();
            }

            if (setAsCurrent)
                ((TestIdentityUserService)userService).CurrentUserName = userName;
        }

        [Ignore]
        public Link Add_test_link(string fullUrl = "http://ya.ru")
        {
            var currentUser = userService.GetCurrentIdentity();

            var link = new Link { FullUrl = fullUrl, IdentityId = currentUser.Id };

            return linkService.InsertLink(link);
        }

        [TestCleanup]
        public void Test_Cleanup()
        {
            using (var context = new ApplicationDbContext(dbContextOptions))
            {
                context.Database.EnsureDeleted();
            }
            addedUserNames.Clear();
        }

        [TestMethod]
        public void Check_link_user()
        {
            Add_test_user();
            var link = Add_test_link();

            var currentUser = userService.GetCurrentIdentity();

            Assert.AreEqual(link.IdentityId, currentUser.Id);
        }

        [TestMethod]
        public void Check_link_short_id_exists()
        {
            Add_test_user();
            var link = Add_test_link();

            Assert.AreNotEqual(string.Empty, link.Reduction);
        }

        [TestMethod]
        public void Check_user_link_access()
        {
            Add_test_user();
            Add_test_link();
            Add_test_user();

            Assert.AreEqual(0, linkService.GetLinks().Count());
        }

        [TestMethod]
        public void Check_user_gets_own_count()
        {
            var userName = "user2";
            Add_test_user();
            Add_test_link();
            Add_test_link("http://google.com");
            Add_test_user(userName);
            Add_test_link();

            Assert.AreEqual(1, linkService.GetLinks().Count());
        }

        [TestMethod]
        public void Check_user_own_link()
        {
            var userName = "user2";
            Add_test_user();
            var link = Add_test_link();
            Add_test_user(userName);
            Add_test_link();
            var user2Link = linkService.GetLinks().FirstOrDefault();

            Assert.AreNotEqual(link.Id, user2Link?.Id);
        }

        [TestMethod]
        public void Check_transition_zero_after_link_add()
        {
            Add_test_user();
            var link = Add_test_link();

            Assert.AreEqual(0, link.Transition);
        }

        [TestMethod]
        public void Check_transition_count()
        {
            Add_test_user();
            var link = Add_test_link();

            var rnd = new Random();
            var transitionCount = rnd.Next(1, 10);

            for (int i = 0; i < transitionCount; i++)
            {
                linkService.GetFullUrl(link.Reduction);
            }

            Assert.AreEqual(transitionCount, link.Transition);
        }

        [TestMethod]
        public void Check_all_links_count()
        {
            Add_test_user();
            Add_test_link("http://ya.ru");
            Add_test_link("http://ya1.ru");
            Add_test_user("user2");
            Add_test_link("http://ya.ru");
            Add_test_link("http://ya1.ru");
            Add_test_link("http://ya2.ru");

            var totalLinkCount = linkService.GetAllLinksCount();
            Assert.AreEqual(5, totalLinkCount);
        }

        [TestMethod]
        [ExpectedException(typeof(Exception),
            "Пользователь не существует")]
        public void Add_link_without_user_throws()
        {
            linkService.InsertLink(new Link() { FullUrl = "http://ya.ru" } );
        }

        [TestMethod]
        public void Add_same_link_throws()
        {
            Add_test_user();
            Add_test_link();
            try
            {
                Add_test_link();
            }
            catch (Exception ex)
            {
                Assert.IsTrue(ex.Message.EndsWith("уже добавлен для текущего пользователя"));
            }
            
        }

        [TestMethod]
        public void Add_wrong_link_throws()
        {
            Add_test_user();
            try
            {
                Add_test_link("blablabla");
                Assert.Fail();
            }
            catch (Exception ex)
            {
                Assert.IsTrue(ex.Message.StartsWith("Некорректный адрес"));
            }

        }
    }

    public class TestIdentityUserService : IIdentityUserService
    {
        private readonly ApplicationDbContext context;
        public string CurrentUserName { get; set; }

        public TestIdentityUserService(ApplicationDbContext context)
        {
            this.context = context;
        }

        public IdentityUser GetCurrentIdentity()
        {
            return context.Users.FirstOrDefault(t => t.UserName == CurrentUserName);
        }

        public bool IsUserExist(string userId)
        {
            return context.Users.Any(t => t.Id == userId);
        }
    }
}
