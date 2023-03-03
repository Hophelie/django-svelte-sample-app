<script>

  import {form} from "./lib/store/store"
    let calculateStore = ""
    form.subscribe(value =>(calculateStore = value))

  import { onMount } from "svelte";
  import Cookies from "js-cookie";
  import Button from "./lib/Button.svelte";
  // import { v4 as uuidv4 } from 'uuid';
  import { Field, Form } from "./lib/Form/index";
  import { validateEmail, validateRequiredField } from "./lib/utils/validation";
  import { get } from "svelte/store";
  const csrfToken = Cookies.get("csrftoken");
  import jQuery from 'jquery'
  export let average_basket;



  onMount(async () => {
    let resp = await fetch("/api/greet").then((res) => res.json());
    let apimessage = resp.user_count;
  });

  let formCalcul = {};
  let test;
 
  function handleInput(e){
    console.log('ici');
    // console.log(name, value);
    //     $form.values[name] = value
    }
  import { getContext } from "svelte";
  import formKey from "./lib/Form/form-key";
  let formStore = getContext(formKey)
  
  function calculPostEventHandler(e) {
    console.log(formStore);

    var formData = new FormData();
    for (const [key, value] of Object.entries(e.detail)) {
      formData.append(key, value);
    }
    postFormCalcul(formData);
  }

  async function postFormCalcul(data) {
    await fetch("/api/greet", {
      method: "POST",
      body: data,
      headers: {
        "X-CSRFToken": csrfToken,
      },
    })
      .then((res) => res.json())
      .then((response) =>{showResult(response)})
      .catch((error) => console.error("Error:", error));
  }
  function showResult(result) {
    console.log(result);
  }
</script>

<pre>
    FORMULAIRE :{JSON.stringify(calculateStore)}
</pre>
    {average_basket}
<main class="container-fluid">
  <div class="row justify-content-center align-items-center">
    <Form
      on:change={(e) => {
       console.log(e);
      }}
      class="col-12 col-md-7 p-5 bg-white rounded-3"
      on:submit={(e) => {
        postFormCalcul(e.detail);
      }}
      id="calculate"
    >
      <div class="row align-items-center mb-4">
        <div class="col-12 ">
          <h1 class="primary">Estimez vos gains avec Yuccan Lead !</h1>
          <p class="lead">
            Vous voulez savoir combien vous pouvez gagner grâce à Yuccan Lead ?
            Utilisez notre calculateur de tarif pour avoir une idée globale de
            la rentabilité de votre campagne de parrainage digital. Cet outil
            simple et efficace vous permettra de maximiser votre retour sur
            investissement.
          </p>
        </div>
      </div>
      <hr class="mt-4 mb-5" />
      <div class="row align-items-center mb-5">
        <div class="col-12 col-xxl-7">
          <span class="h5">Votre panier moyen</span>
          <span class="text-muted ms-2"
            >um animi voluptatibus et saepe dicta qui nisi velit est nobis sint
            ab perspiciatis maxime non assumenda fuga</span
          >
        </div>
        <div class="col-12 col-xxl-5 ">
          <Field
            bind:value={$form.values['average_basket']}
            required
            validate={validateRequiredField}
            id="average_basket"
            type="number"
            placeholder="Panier moyen (€)"
            min="100"
            class="form-control"
          />
        </div>
      </div>
      <div class="row align-items-center mb-5">
        <div class="col-12 col-xxl-7">
          <span class="h5">Nombre d'utilisateurs</span>
          <span class="text-muted ms-2"
            >um animi voluptatibus et saepe dicta qui nisi velit est nobis sint
            ab perspiciatis maxime non assumenda fuga</span
          >
        </div>
        <div class="col-12 col-xxl-5 ">
          <Field 
            required
            validate={validateRequiredField}
            type="number"
            id="users"
            placeholder="Nombre d'utilisateurs"
            min="1"
            class="form-control"
          />
        </div>
      </div>
      <div class="row align-items-center mb-5">
        <div class="col-12 col-xxl-7">
          <span class="h5">Nombre d'agences ou point de vente</span>
          <span class="text-muted ms-2"
            >um animi voluptatibus et saepe dicta qui nisi velit est nobis sint
            ab perspiciatis maxime non assumenda fuga</span
          >
        </div>
        <div class="col-12 col-xxl-5 ">
          <Field
            required
            validate={validateRequiredField}
            type="number"
            id="agencys"
            placeholder="Nombre d'agences"
            min="1"
            class="form-control"
          />
        </div>
      </div>
      <div class="row align-items-center mb-5">
        <div class="col-12 col-xxl-7">
          <span class="h5">Récompense par lead concrétisé (€)</span>
          <span class="text-muted ms-2"
            >um animi voluptatibus et saepe dicta qui nisi velit est nobis sint
            ab perspiciatis maxime non assumenda fuga</span
          >
        </div>
        <div class="col-12 col-xxl-5 ">
          <Field
            required
            validate={validateRequiredField}
            type="number"
            id="reward"
            placeholder="Récompense par lead concrétisé (€)"
            min="1"
            class="form-control"
          />
        </div>
      </div>
      <Button>Envoyer</Button>
    </Form>
  </div>
  <div class="row text-center align-items-center ">
    <div class="col-6" id="image"></div>
    <div class="col-6">
        <div id="result2"  class=" row align-items-center justify-content-center"></div>
        <div id="result" class=" row align-items-center justify-content-center"></div>
    </div>
    <p id="warning" class="d-none text-muted text-start mt-3">
        *Résultats éstimatifs à partir des données utilisateurs de Yuccan Lead
    </p>
</div>
  <div class=" mt-2 justify-content-center align-items-center">
    <div class="col-12 p-5 bg-primary rounded-3">
      <h1 class="text-white">
        <i class="fa-solid fa-paper-plane secondary-2" /> Plus d'informations ?
      </h1>
      <p class="text-white">
        Vous souhaitez un diagnostique complet ? Contactez-nous pour en savoir
        plus sur notre solution de parrainage digital.
      </p>
      <Form
        class=" pt-3"
        on:submit={(e) => {
          calculPostEventHandler(e);
        }}
      >
        <div class="col-12 ">
          <div class="row ">
            <div class="col-12 col-xl-6 ">
              <Field
                required
                validate={validateRequiredField}
                placeholder="Nom"
                class="form-control"
              />
            </div>
            <div class="col-12 col-xl-6 ">
              <Field
                required
                validate={validateRequiredField}
                placeholder="Prénom"
                class="form-control"
              />
            </div>
          </div>
          <div class="row pt-3">
            <div class="col-12 col-xl-6 ">
              <Field 
           
              required placeholder="Adresse mail" 
              class="form-control"/>
            </div>
            <div class="col-12 col-xl-6 ">
              <Field
                required
                validate={validateRequiredField}
                placeholder="Téléphone"
                class="form-control"
              />
            </div>
          </div>
        </div>
        <div class="col-3">
          <Button type="submit" classType=" h-100 w-100 rounded-3 h3 fw-bolder">
            Envoyer
          </Button>
        </div>
      </Form>
    </div>
  </div>
</main>

<style>
  h1 {
    color: var(--sl-color-primary-700);
  }
  hr {
    color: var(--sl-color-warning-600);
  }
</style>
