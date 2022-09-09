from apps.share.models import CollageModel, MajorModel
from utils.service import BaseService


class CollageService(BaseService):
    model = CollageModel


class MajorService(BaseService):
    model = MajorModel
