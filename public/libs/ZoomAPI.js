class ZoomApi{
     #_sdkData = {
          sdkKey: null,
          sdkSecret: null,
          meetingNumber: null,
          passWord: null,
          userName: null,
          userEmail: null, 
     };
     
     #_error = null;

     constructor({sdkKey, sdkSecret, meetingNumber, passWord, userName, userEmail}){
            this.#_sdkData.sdkKey = sdkKey;
            this.#_sdkData.sdkSecret = sdkSecret;
            this.#_sdkData.meetingNumber = meetingNumber;
            this.#_sdkData.passWord = passWord;
            this.#_sdkData.userName = userName;
            this.#_sdkData.userEmail = userEmail;
     }

     init(){
          const someItemsNull = Object.values(this.#_sdkData).some(item => item === null);
          if(someItemsNull){
               this.#_error = "A reunião não está disponível"
          }else{
               this.#_getSignature();
          }
     }

     get error(){
          return this.#_error;
     }

     #_getSignature() {
          ZoomMtg.setZoomJSLib('https://source.zoom.us/2.10.1/lib', '/av')

          ZoomMtg.preLoadWasm()
          ZoomMtg.prepareWebSDK()
          
          ZoomMtg.i18n.load('pt-PT')
          ZoomMtg.i18n.reload('pt-PT')

          ZoomMtg.generateSDKSignature({
               meetingNumber: this.#_sdkData.meetingNumber,
               sdkKey: this.#_sdkData.sdkKey,
               sdkSecret: this.#_sdkData.sdkSecret,
               role: 0,
               success: (res) => {
                    this.#_startMeeting(res.result);
               },
               error: (res) => {
                    this.#_error = "A reunião não está disponível"
               }
          });
     }

     #_startMeeting(signature) {
          document.getElementById('zmmtg-root').style.display = 'block'
          ZoomMtg.init({
               leaveUrl: window.location.href,
               success: (success) => {
                    console.log(success)
                    ZoomMtg.join({
                         signature: signature,
                         sdkKey: this.#_sdkData.sdkKey,
                         meetingNumber: this.#_sdkData.meetingNumber,
                         passWord: this.#_sdkData.passWord,
                         userName: this.#_sdkData.userName,
                         userEmail: this.#_sdkData.userEmail,
                         tk: '',
                         zak: '',
                         success: (success) => {
                              console.log(success)
                         },
                         error: (error) => {
                              console.log(error)
                              this.#_error = "A reunião não está disponível"
                         },
                    })
               },
               error: (error) => {
                    console.log(error)
                    this.#_error = "A reunião não está disponível"
               }
          })
     }
}