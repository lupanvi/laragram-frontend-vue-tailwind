import Vue from 'vue'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import VueRouter from 'vue-router'
import UploadButton from './'
import routes from '@/router/routes'

const localVue = createLocalVue()
localVue.use(VueRouter)

const setup = ()=>{	
    const router = new VueRouter({routes})		
	return shallowMount(UploadButton,{
        localVue,
        router
    })		
}

describe('render', () => {

    it('renders UploadButton component without errors', () => {     
    	const wrapper = setup()
    	expect(wrapper.find('.add_images').exists()).toBe(true)
    })

    it('renders input file', () => {     
        const wrapper = setup()
        expect(wrapper.find('input[type="file"]').exists()).toBe(true)
    })  
      
})

describe('UploadButton actions', ()=>{

    it("it takes the file from the event", async () => {

        const wrapper = setup()

        const file = { size: 1000, type: "image/png", name: "image.png" }
        const event = {
            target: {
                files: [file]
            }
        }  

        expect(wrapper.vm.takeFile(event)).toEqual(file)                            

    })

})    