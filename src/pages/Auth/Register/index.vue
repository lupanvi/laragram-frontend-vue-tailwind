<template>    
    <div class="register">        
        <div class="bg-white w-full border-2 px-10 py-10 sm:mx-auto sm:w-8/12 md:w-6/12 lg:w-4/12">                                      
            <h1 class="text-center text-4xl">Laragram</h1>
            <h3 class="text-center text-2xl">Sign up to see photos and videos from your friends.
            </h3>                                      
            <form method="POST" @submit.prevent="register">
                <div class="mt-4 form-group" :class="{ 'form-group--error': $v.form.name.$error }">                    
                    <div class="special-label-holder">     
                        <input  
                            placeholder=" "
                            autocomplete="name" 
                            id="name" 
                            type="text" 
                            class="name form-input"
                            name="name"
                            v-model="form.name" 
                            @keydown="errors.name = false" 
                        />
                         <label for="name">Name</label>
                     </div>                                        
                     <div 
                        class="error text-xs text-red-400" 
                        v-if="!$v.form.name.required">Name is required
                     </div>
                </div>                    
                <div class="mt-4 form-group" :class="{ 'form-group--error': $v.form.email.$error }">                    
                    <div class="special-label-holder">
                        <input  
                            placeholder=" "
                            autocomplete="off"
                            id="email" 
                            type="email" 
                            class="email form-input" 
                            name="email"
                            v-model="form.email" 
                            @keydown="errors.email = false"
                        />
                        <label for="email" >Email</label>
                    </div> 
                     <div 
                        class="error text-xs text-red-400" 
                        v-if="!$v.form.email.required">Email is required
                    </div>                                         
                    
                </div>               
                <div class="mt-4 form-group" :class="{ 'form-group--error': $v.form.password.$error }">                    
                    <div class="special-label-holder"> 
                        <input
                            placeholder=" "
                            id="password" 
                            type="password" 
                            class="password form-input" 
                            name="password" 
                            autocomplete="new-password" 
                            v-model="form.password" 
                            @keydown="errors.password = false"
                        />
                        <label for="password" >Password</label>
                    </div> 
                    <div 
                        class="error text-xs text-red-400" 
                        v-if="!$v.form.password.required">Password is required
                    </div> 
                    
                </div>
                <div class="mt-4 form-group" :class="{ 'form-group--error': $v.form.password_confirmation.$error }">                
                    <div class="special-label-holder">
                        <input                                     
                            placeholder=" "
                            id="password-confirm" 
                            type="password" 
                            class="password_confirmation w-full transition duration-300 ease-in-out h-9 bg-gray-100 border rounded focus:outline-none focus:ring-2 focus:border-blue-300 text-gray-600 text-sm" 
                            name="password_confirmation"
                            autocomplete="new-password"
                            v-model="form.password_confirmation" 
                            @keydown="errors.password = false"
                        />
                        <label for="password-confirm" >Confirm password</label>
                    </div>
                    <div 
                        class="error text-xs text-red-400" 
                        v-if="!$v.form.password_confirmation.required">Password confirmation is required
                    </div> 
                    
                </div>
                <div class="mt-4 text-center">
                        <button type="submit" class="bg-blue-500 text-white active:bg-blue-500 text-md px-3 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none hover:bg-blue-600" :disabled="loading">
                            Register
                        </button>
                        <div class="mt-6" v-if="feedback">
                            <div class="text-danger" v-text="feedback"></div>
                        </div> 
                        <div class="mt-5 text-center text-sm">
                            <p>
                                By signing up, you agree to our Terms , Data Policy and Cookies Policy.
                            </p>
                        </div>                   
                </div>                
            </form>
        </div>

        <div class="mt-5 bg-white w-full border-2 px-10 py-3 sm:mx-auto sm:w-8/12 md:w-6/12 lg:w-4/12">
                <p class="m-3 text-base text-gray-600 text-center">
                    Tienes una cuenta? <router-link class="text-blue-500" :to="{ name:'login' }">entrar</router-link>
                </p>
        </div>          
    </div>                         
</template>

<script>
import {REGISTER} from '@/store/actions.type.js'
import { required, email } from 'vuelidate/lib/validators'
export default {
    name:'Register',    
    data() {
        return {
            form: {
                name: "",                
                email: "",
                password: "",
                password_confirmation: ""
            },
            feedback: "",
            loading: false            
        };
    },
    validations: {
        form:{
            name: {
                required                         
            },
            email: {
                required,
                email                        
            },
            password: {
                required
            },
            password_confirmation: {
                required                
            }
        }
    },
    methods: {
        async register(){

            this.$v.$touch()

            if (this.$v.$invalid) {
                return false;
            }
            
            this.loading = true;

            try{
                await this.$store.dispatch(REGISTER, this.form)    
                this.$router.push('/login');  
            }catch(error){
                this.loading = false;
                this.feedback = error.response.data.message;
            }            

        }
    }
};
</script>
