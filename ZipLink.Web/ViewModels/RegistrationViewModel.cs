using FluentValidation.Attributes;
using ZipLink.Web.ViewModels.Validations;

namespace ZipLink.Web.ViewModels
{
    [Validator(typeof(RegistrationViewModelValidator))]
    public class RegistrationViewModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
