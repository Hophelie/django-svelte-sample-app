<script>

  import { writable } from "svelte/store";
  import { setContext } from "svelte";
  import { createEventDispatcher } from "svelte";
  import { v4 as uuidv4 } from "uuid";

  export let id = uuidv4();
//   export let initialValues = { id: id };
//   export const form = writable({ values: initialValues, errors: {} });
  import formKey from "./form-key";

  const dispatch = createEventDispatcher();
//   setContext(formKey, form);
  export let test = "";
  export { className as class };
  let className;
  let form;
</script>

<form
  method="POST"
  {id}
  class="{className}"
  action=""
  bind:this={test}
  on:submit|preventDefault={() => {
    dispatch("submit", $form.values);
  }}
  on:change

>
  <slot />
</form>
