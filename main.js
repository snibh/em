Webcam.set({
    width:360,
    height:250,
    image_format : 'png',
    png_quality:90
})

camera = document.getElementById("camera");
Webcam.attach(camera);

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="Emotion" src="'+data_uri+'">';
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/e_HqpaStl/model.json',modelLoaded);

function modelLoaded() {
    console.log("hi");
}

function speak()
{
    var synth = window.speechSynthesis;

    speak_data1 = "I think you are " + prediction_1;
    speak_data2 = "or else " + prediction_2;
 
    

    var utterThis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);

    synth.speak(utterThis);
}

    function check() 
    {

      img = document.getElementById('Emotion');
      classifier.classify(img, gotResult);

    }

    function gotResult(error, results)
    {

       if (error) {
           console.error(error);
       }
       else
       {
           console.log(results);
           document.getElementById("result_emotion_name").innerHTML = results[0].label;
           document.getElementById("result_emotion_name2").innerHTML = results[1].label;
           prediction_1 = results[0].label;
           prediction_2 = results[1].label;
           speak();
           if (results[0].label == "happy")
           {
               document.getElementById("update_emoji").innerHTML = "&#128512;"
           }
           if (results[0].label == "sad")
           {
               document.getElementById("update_emoji").innerHTML = "&#128532"
           }
           if (results[0].label == "angry")
           {
               document.getElementById("update_emoji").innerHTML = "&#128545;"
           }
           if (results[1].label == "happy")
           {
               document.getElementById("update_emoji2").innerHTML = "&#128522;"
           }
           if (results[1].label == "sad")
           {
               document.getElementById("update_emoji2").innerHTML = "&#128546;"
           }
           if (results[1].label == "angry")
           {
               document.getElementById("update_emoji2").innerHTML = "&#128548;"
           }
       }

    }


