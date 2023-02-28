from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.renderers import JSONRenderer



class GreetingApi(APIView):
    """API endpoint that allows users to be viewed or edited."""
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    renderer_classes = [JSONRenderer]

    def get(self, request, format=None):
        """Return a list of all users."""
        # user_count = User.objects.filter(active=True).count()
        content = {'user_count': 'user_count'}
        return Response(content)