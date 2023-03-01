<script>
    import { onMount} from "svelte";
    import Cookies from 'js-cookie';
    import Button from './lib/Button.svelte';
	// import { v4 as uuidv4 } from 'uuid';
	import { Field, Form } from './lib/Form/index';
    const csrfToken = Cookies.get('csrftoken');
    
    onMount(async () => {
        
        let resp = await fetch("/api/greet").then((res) => res.json());
        let apimessage = resp.user_count;
    });
    
    let formCalcul = {}
    let test
    
    function calculEventHandler(e) {
    formCalcul = e.detail.values
    const requiredFields = ['averageBasket', 'agencys', 'reward','users']; //  les ids des champs requis
    let isValid = true;
    
    // vérifie si tous les champs requis ont été remplis
    requiredFields.forEach(field => {
    if (!formCalcul.hasOwnProperty(field) || formCalcul[field] === '') {
      isValid = false;
    }
  });
    if (isValid) {
       
       postFormCalcul(formCalcul)
    }
}


async function postFormCalcul(formCalcul) {

    let form = test;
    console.log(form);
    // let formData = new FormData(form);
    // const response = await fetch('/api/greet', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'X-CSRFToken': csrfToken, 
    //     },
    //     //  REVOIR LES DATA CAR REQUEST.POST EST VIDE
    //     data:  formData
    // });
    // const data = await response.json();
    // console.log(data);
    // return data;
}

</script>

<main class="container-fluid">
        <div class="row justify-content-center align-items-center">
            <Form class="col-12 col-md-7 p-5 bg-white rounded-3" on:changeFormValues={calculEventHandler} bind:el={test} id="calculate">
                <div class="row align-items-center mb-4">
                    <div class="col-12 ">
                        <h1 class="primary">Estimez vos gains avec Yuccan Lead !</h1>
                        <p class="lead">
                            Vous voulez savoir combien vous pouvez gagner grâce à Yuccan Lead ? Utilisez notre calculateur de tarif pour avoir une idée globale de la rentabilité de votre campagne de parrainage digital. Cet outil simple et efficace vous permettra de maximiser votre retour sur investissement.
                        </p>
                    </div>
                </div>
                <hr class="mt-4 mb-5"/>
                <div class="row align-items-center mb-5">
                    <div class="col-12 col-xxl-7">
                        <span class="h5">Votre panier moyen</span>
                        <span class="text-muted ms-2">um animi voluptatibus et saepe dicta qui nisi velit est nobis sint ab perspiciatis maxime non assumenda fuga</span>
                    </div>
                    <div class="col-12 col-xxl-5 ">
                        <Field id="averageBasket" type="number" placeholder="Panier moyen (€)"  min=100></Field>
                    </div>
                </div>
                <div class="row align-items-center mb-5">
                    <div class="col-12 col-xxl-7">
                        <span class="h5">Nombre d'utilisateurs</span>
                        <span class="text-muted ms-2">um animi voluptatibus et saepe dicta qui nisi velit est nobis sint ab perspiciatis maxime non assumenda fuga</span>
                    </div>
                    <div class="col-12 col-xxl-5 ">
                        <Field type="number" id="users" placeholder="Nombre d'utilisateurs" min=1></Field>
                    </div>
                </div>
                <div class="row align-items-center mb-5">
                    <div class="col-12 col-xxl-7">
                        <span class="h5">Nombre d'agences ou point de vente</span>
                        <span class="text-muted ms-2">um animi voluptatibus et saepe dicta qui nisi velit est nobis sint ab perspiciatis maxime non assumenda fuga</span>
                    </div>
                    <div class="col-12 col-xxl-5 ">
                        <Field type="number" id="agencys" placeholder="Nombre d'agences" min=1></Field>
                    </div>
                </div>
                <div class="row align-items-center mb-5">
                    <div class="col-12 col-xxl-7">
                        <span class="h5">Récompense par lead concrétisé (€)</span>
                        <span class="text-muted ms-2">um animi voluptatibus et saepe dicta qui nisi velit est nobis sint ab perspiciatis maxime non assumenda fuga</span>
                    </div>
                    <div class="col-12 col-xxl-5 ">
                        <Field type="number" id="reward" placeholder="Récompense par lead concrétisé (€)" min=1></Field>
                    </div>
                </div>
            </Form>
        </div>
        <div class=" mt-2 justify-content-center align-items-center">
            <div class="col-12 p-5 bg-primary rounded-3">
                <h1 class="text-white">
                    <i class="fa-solid fa-paper-plane secondary-2"></i> Plus d'informations ?
                </h1>
                <p class="text-white">
                    Vous souhaitez un diagnostique complet ? Contactez-nous pour en savoir plus sur notre solution de parrainage digital.
                </p>
                <Form class=" pt-3">
                    <div class="col-12 ">
                        <div class="row ">
                            <div class="col-12 col-xl-6 ">
                                <Field  placeholder="Nom"></Field>
                            </div>
                            <div class="col-12 col-xl-6 ">
                                <Field  placeholder="Prénom"></Field>
                            </div>
                        </div>
                        <div class="row pt-3">
                            <div class="col-12 col-xl-6 ">
                                <Field  placeholder="Adresse mail"></Field>
                            </div>
                            <div class="col-12 col-xl-6 ">
                                <Field  placeholder="Téléphone"></Field>
                            </div>
                        </div>
                    </div>
                    <div class="col-3">
                        <Button type="submit"
                            classType=" h-100 w-100 rounded-3 h3 fw-bolder">
                            Envoyer
                        </Button>
                    </div>
                </Form>
            </div>
        </div>
</main>
<style>
    h1{
        color:var(--sl-color-primary-700)
    }
    hr{
        color:var(--sl-color-warning-600)
    }
</style>