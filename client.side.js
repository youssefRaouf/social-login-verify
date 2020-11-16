googlesignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      let data = await fetch('http://192.168.1.3:4000/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
         type:"GOOGLE",
         token:userInfo.idToken
        }),
      }).then(response => response.json())
      console.log("el data",data);
      this.apiSignIn({ ...userInfo.user });
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };


 // facebook button from facebook sdk
  <LoginButton
          onLoginFinished={async(error, result) => {
            console.log('result')
            if (error) {
              console.log("login has error: " + result.error);
            }
            else if (result.isCancelled) {
              console.log("login is cancelled.");
            } else {
              AccessToken.getCurrentAccessToken().then(async(token) => {
                let data = await fetch('http://192.168.1.3:4000/login', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                   type:"FACEBOOK",
                   token:token.accessToken
                  }),
                }).then(response => response.json())
                new GraphRequestManager().addRequest(
                  new GraphRequest('/me', {
                    accessToken: token.accessToken,
                    parameters: {
                      fields: {
                        string: 'email,name,picture.type(large)'
                      }
                    }
                  }, (err, res) => {
                    if (err) {
                      console.log("Facebook graph error " + err);
                    } else {
                      this.apiSignIn({
                        name: res.name,
                        email: res.email,
                        photo: res.picture.data.url,
                      });
                    }
                  })
                ).start();
              }).catch((err) => {
                console.log("Facebook current access token error " + err);
              });
            }
          }
          }
          onLogoutFinished={() => console.log("logout.")}
          permissions={['email', 'public_profile']}
        />