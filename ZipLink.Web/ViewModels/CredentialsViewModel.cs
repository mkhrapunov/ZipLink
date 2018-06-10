﻿using ZipLink.Web.ViewModels.Validations;
using FluentValidation.Attributes;

namespace ZipLink.Web.ViewModels
{
    [Validator(typeof(CredentialsViewModelValidator))]
    public class CredentialsViewModel
    {
        public string UserName { get; set; }
        public string Password { get; set; }
    }
}
