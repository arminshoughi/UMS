from apps.master.models import MasterModel
from utils.service import BaseService


class MasterService(BaseService):
    model = MasterModel

    @classmethod
    def create(cls, **kwargs):
        kwargs['is_superuser'] = True
        master = super().create(**kwargs)
        master.set_password(kwargs['password'])
        master.save()
        return master
