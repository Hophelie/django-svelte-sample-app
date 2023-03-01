from django import forms

class calculateForm(forms.Form):
    commercial_code = forms.IntegerField(
        min_value=1, required=False, label="Code commercial"
    )
