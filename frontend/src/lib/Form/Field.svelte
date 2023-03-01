
<script>
    import { getContext } from "svelte";
    import { v4 as uuidv4 } from 'uuid';
    export let value;
    export let min = undefined;
    export let placeholder="Entrez votre valeur";
    export let type = "text";
    export let id = uuidv4();
    export let name = id;
    // j'apelle le store du form   
    import formKey from "./form-key"
    let form = getContext(formKey)

    function handleInput(e){
        const newValue = e.target.value;
        form.update(f => ({...f, values: {...f.values, [id]: newValue}}));
    }
</script>

    <sl-input class="my-1" bind:this={value}
           {type}
           {min}
           {placeholder}
           {id}
           {name}  
           on:input={(e)=>{ 
            handleInput(e)
           }}>test 
   </sl-input><span class="focus-border"></span>
   

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