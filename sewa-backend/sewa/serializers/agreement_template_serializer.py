from rest_framework import serializers

from sewa.models.agreement_template import AgreementTemplate
from sewa.serializers.user_serializer import UserSerializer

class AgreementTemplateSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    author = UserSerializer(read_only=True)

    class Meta:
        model = AgreementTemplate
        fields = ('id', 'author_id', 'author', 'title', 'content', 'sign_image')

    def create(self, validated_data):
        current_user = self.context['user']
        obj = AgreementTemplate()
        obj.author = current_user
        obj.title = validated_data.get('title')
        obj.content = validated_data.get('content')
        obj.sign_image = validated_data.get('sign_image')
        obj.save()

        return obj