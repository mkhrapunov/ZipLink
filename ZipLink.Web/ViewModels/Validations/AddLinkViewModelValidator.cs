using FluentValidation;

namespace ZipLink.Web.ViewModels.Validations
{
    public class AddLinkViewModelValidator : AbstractValidator<AddLinkViewModel>
    {
        public AddLinkViewModelValidator()
        {
            RuleFor(vm => vm.Url).NotEmpty().WithMessage("Url не может быть пустым");
        }
    }
}
