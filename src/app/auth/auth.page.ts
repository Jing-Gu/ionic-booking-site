import { listLazyRoutes } from '@angular/compiler/src/aot/lazy_routes'
import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { LoadingController } from '@ionic/angular'
import { AuthService } from './auth.service'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLoading = false
  isLogin = true

  loginForm: FormGroup

  constructor(private authService: AuthService,
              private router: Router,
              private loadingControl: LoadingController,
              private fb: FormBuilder) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')]]
    })
  }

  get email() {
    return this.loginForm.get('email')
  }

  get password() {
    return this.loginForm.get('password')
  }

  onSwitchAuthMode(){
    this.isLogin = !this.isLogin
  }

  onLogin(){
    this.isLoading = true
    this.authService.login()
    this.loadingControl
      .create({
         keyboardClose: true,
         message: 'Logging in...'
        })
      .then((loadingEl => {
        loadingEl.present()
        setTimeout(() => {
          this.isLoading = false
          loadingEl.dismiss()
          this.router.navigateByUrl('/places/discover')
        }, 2000)
      })
      )
  }

  onSubmit(){
    if(!this.loginForm.valid){
      return
    }
    
    console.log(this.email.value, this.password.value)
  }

}
