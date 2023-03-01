from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions, status
from rest_framework.renderers import JSONRenderer
from django.http import JsonResponse
from djangoXsvelte.helpers import functions, forms
import json
import pdb



class GreetingApi(APIView):
    """API endpoint that allows users to be viewed or edited."""
    authentication_classes = [authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]

    renderer_classes = [JSONRenderer]

    def get(self, request, *args, **kwargs):
        """Return a list of all users."""
        # user_count = User.objects.filter(active=True).count()
        content = {'user_count': 'user_count'}
        return Response(content)
    
    def post(self, request, *args, **kwargs):
        try:
            pdb.set_trace()
            form = forms.calculateForm(request.POST)
            if form.is_valid():
                test = []
                return JsonResponse(
                    json.dumps(test), status=status.HTTP_200_OK, safe=False
                )
            else:
                for field, error in functions.parse_form_errors(form):
                    return JsonResponse(
                        {"error": {"message": f"{field}: {error}"}},
                        status=status.HTTP_418_IM_A_TEAPOT,
                    )
        # pylint: disable=broad-except
        except Exception :
            return JsonResponse(
                {"error": {"message": "Certains champs sont manquants"}},
                status=status.HTTP_418_IM_A_TEAPOT,
            )