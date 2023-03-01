<script>
import { writable } from "svelte/store";
import { setContext } from "svelte";
import { createEventDispatcher } from "svelte";

export let initialValues = {}

export const form = writable({values:initialValues , errors:{}}) 
import formKey from "./form-key"

const dispatch = createEventDispatcher()
setContext(formKey, form)


function handleSubmit(event){
    event.preventDefault();
    
    dispatch('submit', {values: $form.values});
}

$:{

    dispatch('changeFormValues', {values: $form.values});
}


</script>

<form class="input-validation-required" action="" on:changeFormValues on:submit|preventDefault={()=>{handleSubmit;
 }}>
    <slot/>
</form>

