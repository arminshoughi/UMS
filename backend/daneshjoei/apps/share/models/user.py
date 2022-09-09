from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import BaseUserManager
from django.db import models

from utils.models import BaseModel
from .. import consts

from ..validators import UsernameValidator, NationalCodeValidator, PhoneValidator


class UserManagement(BaseUserManager):
    def create_user(self, username, password, **kwargs):
        user = self.model(username=username, **kwargs)
        user.set_password(password)
        user.save(using=self.db)
        return user

    def create_superuser(self, username, password):
        return self.create_user(
            username=username, password=password, is_superuser=True, is_active=True
        )


class UserModel(AbstractBaseUser, BaseModel):
    username = models.CharField(
        verbose_name='Username', max_length=150, validators=[UsernameValidator()], unique=True,
        error_messages={'unique': 'Sorry, this username already token.'}
    )
    first_name = models.CharField(verbose_name='First name', max_length=128, null=False, blank=False)
    last_name = models.CharField(verbose_name='Last name', max_length=256, null=False, blank=False)
    national_code = models.CharField(
        verbose_name='National code', max_length=10, validators=[NationalCodeValidator()], null=True, blank=True
    )
    birthday = models.DateField(verbose_name='Birthday', null=True, blank=True)
    sex = models.CharField(verbose_name='Sex', choices=consts.SEX_TYPE_CHOICES, default=consts.MALE, max_length=6)
    is_superuser = models.BooleanField(verbose_name='Superuser', default=False)
    is_active = models.BooleanField(verbose_name='Active', default=False)
    last_login = models.DateTimeField(verbose_name='Last login', null=True, blank=True)
    updated_at = models.DateTimeField(verbose_name='Last update', null=True, blank=True)
    created_at = models.DateTimeField(verbose_name='Created at', auto_now_add=True)

    object = UserManagement()
    USERNAME_FIELD = 'username'

    class Meta:
        verbose_name = 'user'
        verbose_name_plural = 'users'

    def display_name(self):
        return f'{self.first_name} {self.last_name}'

    @property
    def default_phone(self):
        self.phones.filter(is_default=True).first()

    @property
    def default_mobile(self):
        self.mobiles.filter(is_default=True).first()

    @property
    def default_address(self):
        self.addresses.filter(is_default=True)

    @property
    def default_emails(self):
        self.emails.filter(is_default=True)


class UserPhoneModel(BaseModel):
    user = models.ForeignKey(verbose_name='User', to=UserModel, related_name='phones', on_delete=models.CASCADE)
    phone = models.CharField(verbose_name='تلفن ثالت', max_length=11, validators=[PhoneValidator()])
    is_default = models.BooleanField(verbose_name='Default', default=False)


class UserMobileModel(BaseModel):
    user = models.ForeignKey(verbose_name='User', to=UserModel, related_name='mobiles', on_delete=models.CASCADE)
    mobile = models.CharField(verbose_name='Mobile', max_length=11, validators=[PhoneValidator()])
    is_default = models.BooleanField(verbose_name='Default', default=False)


class UserAddressModel(BaseModel):
    user = models.ForeignKey(verbose_name='User', to=UserModel, related_name='addresses', on_delete=models.CASCADE)
    address = models.TextField(verbose_name='Address', null=False, blank=False)
    is_default = models.BooleanField(verbose_name='Default', default=False)


class UserEmailModel(BaseModel):
    user = models.ForeignKey(verbose_name='User', to=UserModel, related_name='emails', on_delete=models.CASCADE)
    email = models.TextField(verbose_name='Email', null=False, blank=False)
    is_default = models.BooleanField(verbose_name='Default', default=False)
