
<script> 

    import {form} from "../store/store"
    
    





    import { getContext } from "svelte";
    import { v4 as uuidv4 } from 'uuid';
    export let value;
    export let min = undefined;
    export let placeholder="Entrez votre valeur";
    // export let type = "text";
    export let id = uuidv4();
    export let name = id;
    // export let validate = undefined;
    export let required = false;
    export { className as class };

    let className;
    // j'apelle le store du form   
    import formKey from "./form-key"
    let formStore = getContext(formKey)
    
    
</script>

    <input bind:value
           {min}
           {placeholder}
           {id}
           {name}
           {required}
           class="{className}"
           />
   

<!-- 
<style lang="scss">
    
/* BORDER ON INPUTS */
.sl-input {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 12px 20px;
    box-sizing: border-box;
    transition: 0.5s;
    display: block;
    width: 100%;
    margin-bottom: 10px;
    font-size: 16px;
    color: #555;
    background-color: #fff;
} -->
 
   
<!-- </style> -->