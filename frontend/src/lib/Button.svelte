<script>
    export let classType='form-control'
    export let type="submit"
</script>

<!-- <button class="{classType}"  > -->
    
<!-- </button> -->
<button {type} class="{classType}" on:click on:keydown variant="primary"><slot/></button>


