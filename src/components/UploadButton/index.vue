 <template>
   <div class="add_images">
    <form method="POST" action="posts/create">
      <input           
          accept="image/*"
          type="file"
          name="file"
          id="file" 
          @change="handleImageSelected" 
          class="hidden"         
       />
      <label for="file">        
        <Fa :icon="['far', 'plus-square']" class="bg-grey-500 text-4xl cursor-pointer" /> 
      </label>
    </form>
  </div> 
</template>

<script>
export default{ 

  data(){
    return {
      error: false
    }
  },      
  methods:{     
    handleImageSelected(ev){
        const file = this.takeFile(ev)
        if (!this.validImage(file)){
          this.error = true
          return false          
        }
        this.createImage(file)                                     
    }, 
    takeFile(ev) {
      return ev.target.files[0] || ev.dataTransfer.files[0]                
    },
    validImage(file){
       
      const allowedExtensions = ["image/png", "image/jpg", "image/jpeg", "image/gif"]      
      if (!allowedExtensions.includes(file.type)){
        return false 
      }        
      
      return true   

    } ,
    createImage(imageFile){
        let reader = new FileReader();
        reader.readAsDataURL(imageFile);          
        reader.onload = e => {
            let image = e.target.result;                          
            this.$router.push({ name: 'posts.create', params: { image, imageFile } });
        };        
    }                 
  }
}
</script>