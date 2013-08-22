$(function() {
    $('#header').click(function(e) {
            $('#dialog').slideToggle({ 
                duration : 'medium', 
                easing : 'linear'
            });
            if ($('#explanation').is(':visible')){
                $('#explanation').slideToggle({
                    duration : 'medium', 
                    easing : 'linear'
                });
            }

        return false;
    });
 $('#dialog').click(function(e) {
            $('#dialog').slideToggle({ 
                duration : 'medium', 
                easing : 'linear'
            });
          return false;
        })
    $('#explanation').click(function(e) {
        $('#explanation').slideToggle({ 
            duration : 'medium', 
            easing : 'linear'
          });
    });

    $('.openArrow').click(function(e) {
            $('#dialog').slideToggle({ 
                duration : 'medium', 
                easing : 'linear'
            });    
        return false;
    });

    $('#see').change(function(e) {
        $('#dialog').slideToggle({ 
            duration : 'medium', 
            easing : 'linear'
        });  

        zoomToLake($('#see').val());
    });

    $('#see').click(function(e){
      return false;
    });

    $('#badestelle').change(function(e) {
        $('#dialog').slideToggle({ 
            duration : 'medium', 
            easing : 'linear'
        });
        zoomToBathplace($('#badestelle').val());
        var el = document.getElementById('badestelle');
        console.log(el.options[el.selectedIndex].text);
        showInfoPanel(el.options[el.selectedIndex].text+"");
    });  

      $('#badestelle').click(function(e){
      return false;
    });

}); 

function questionmark(text){
   var infotext = '<h4> Was sind eigentlich ' + text + ' ?? </h4>';
   if (text  == 'E.coli'){
        infotext += '<p id = "explanationText">Escherichia coli ist ein natürlich vorkommender Keim (Kommensale) im Darm von Vögeln und warmblütigen Säugetieren. Ebenso ist er Bestandteil der Darmflora des Menschen. Auf Grund dessen gilt es auch als Fäkalindikator. </br> Bestimmte Stämme von Escherichia coli können bei Tieren und Menschen schwerwiegende Erkrankungen hervorrufen. ';
        infotext += 'So spielen E. coli als häufigste Verursacher von bakteriellen Harnwegsinfektionen eine wichtige Rolle. Zudem sind sie als Erreger von Blutvergiftungen und Krankenhausinfektionen gefürchtet. </br> Die Keime bezeichnet man deswegen auch als sogenannte extraintestinal pathogene E. coli (ExPEC), d.h. als Erreger, die außerhalb des Darmes Krankheiten auslösen können.</p>';

   }
   else if (text == 'Int. Enterokokken'){
    infotext += '<p id = "explanationText">Intestinale Enterokokken zählen zu den fäkalen Streptokokken, die bei Warmblütern (wozu auch der Mensch zählt) zur normalen Darmflora zählen. In Gewässern bleiben aus dem Darm stammende intestinale Enterokokken länger in einem vermehrungsfähigen Zustand als E. coli, können sich dort unter den bei uns herrschenden Bedingungen aber ebenfalls nicht etablieren und vermehren. Dementsprechend deutet ein Nachweis größerer Mengen intestinaler Enterokokken bei Abwesenheit von E. coli auf eine länger zurückliegende fäkale Verunreinigung hin. Gelangen intestinale Enterokokken durch orale Aufnahme in den Magen-Darm-Trakt, kommt es zu keiner Infektion. Dagegen kann es zu schweren Erkrankungen durch intestinalen Enterokokken wie E. faecalis kommen, wenn diese über Wunden in den Körper gelangt.</p>';
   }
   else {
    infotext += '<p id = "explanationText"> ' + text + '... haha how could this happen? </p>'
   }
  if ($('#dialog').is(':visible')){
    $('#dialog').slideToggle({
       duration : 'medium', 
       easing : 'linear'
    });
  }
  $("#explanation").html(infotext);
  if ($('#explanation').is(':hidden')){
    $('#explanation').slideToggle({ 
      duration : 'medium', 
      easing : 'linear'
    }); 
  }
  
  return false;
}

        