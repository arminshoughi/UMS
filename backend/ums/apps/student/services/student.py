from utils.service import BaseService

from ..models import StudentModel


class StudentService(BaseService):
    model = StudentModel
