[1mdiff --git a/src/auth/pages/Login.jsx b/src/auth/pages/Login.jsx[m
[1mindex f9f19d1..5a3be53 100644[m
[1m--- a/src/auth/pages/Login.jsx[m
[1m+++ b/src/auth/pages/Login.jsx[m
[36m@@ -28,9 +28,9 @@[m [mexport const Login = () => {[m
 [m
     const handleSubmit = (e) => {[m
         e.preventDefault();[m
[31m-        if (username.trim().toLoweCase() == "omar" && pswd == "1234") {[m
[31m-            localStorage.setItem('auth', true);[m
[32m+[m[32m        if (username.trim().toLowerCase() == "omar" && pswd == "1234") {[m[41m[m
             dispatch(onLogin());[m
[32m+[m[32m            localStorage.setItem('auth', true);[m[41m[m
         } else {[m
             notifyError('Incorrect username or password');[m
         }[m
[1mdiff --git a/src/types.js b/src/types.js[m
[1mindex 0bf0d4f..a87e5f7 100644[m
[1m--- a/src/types.js[m
[1m+++ b/src/types.js[m
[36m@@ -1,6 +1,6 @@[m
 [m
[31m-// export const base_url = 'https://dannyhhbackend.up.railway.app/';[m
[31m-export const base_url = 'http://localhost:3001/';[m
[32m+[m[32mexport const base_url = 'https://dannyhhbackend.up.railway.app/';[m[41m[m
[32m+[m[32m// export const base_url = 'http://localhost:3001/';[m[41m[m
 [m
 [m
 export const days_of_week = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'][m
