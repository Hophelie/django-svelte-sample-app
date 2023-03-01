import json

#  parse errors from form
def parse_form_errors(form):
    errors = json.loads(form.errors.as_json())
    errors_dic = {}
    for field, error in errors.items():
        field_name = ""
        for name, field_obj in form.fields.items():
            if field == name:
                field_name = field_obj.label
        errors_dic[field_name] = error[0]['message']
    return errors_dic.items()