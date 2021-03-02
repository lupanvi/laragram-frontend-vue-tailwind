<template>
	<footer class="fixed px-6 sm:px-0 bottom-0 right-0 left-0 bg-white">        
      <div class="w-full sm:w-8/12 md:w-6/12 mx-auto flex justify-between">        
        <Fa icon="home" class="bg-grey-300 text-4xl cursor-pointer" />        
        <UploadButton />        
      </div>                   
  </footer>
</template>
<script>
import UploadButton from '@/components/UploadButton'
export default{
	name:'Footer',
	components:{UploadButton}
};
</script>