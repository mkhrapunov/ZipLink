using FluentValidation;

namespace ZipLink.Web.ViewModels.Validations
{
    public class RegistrationViewModelValidator : AbstractValidator<RegistrationViewModel>
    {
        public RegistrationViewModelValidator()
        {
            RuleFor(vm => vm.UserName).NotEmpty().WithMessage("Имя пользователя не должно быть пустым");
            RuleFor(vm => vm.Password).NotEmpty().WithMessage("Пароль не должен быть пустым");
        }
    }
}
