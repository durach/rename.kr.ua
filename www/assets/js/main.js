$(function() {
	
	var search = '';

	var results = {};

	var html = ''; 

	var currentHtml = $('.readyTable').find('tbody').html();

	$(document).on('click', '.alphebet', function(event) {
		event.preventDefault();
		var aRow = $(document).find('.delimeter[data-letter="'+$(this).text()+'"]');
		if (aRow) {
			$('html, body').animate({
		        scrollTop: aRow.offset().top
		    }, 2000);
		}
	});

	$(document).on('change keyup', 'input[name="placeInp"]', function(event) {
		event.preventDefault();

		if ( search == $(this).val() && !$(this).val())
			search = false;
		else
			search = $(this).val()

		if (search) {

			results = {};

			$.each($(currentHtml).find('.old_name, .new_name'), function(index, val) {

				var elText = $(this).text();
				
				if (elText && elText.indexOf(search) >= 0) {

					if ($.isEmptyObject(results[elText.substr(0,1)])) 
						results[elText.substr(0,1)] = [];
					
					results[elText.substr(0,1)].push({ new_name:$(this).parent('.place-row').find('td.new_name'), old_name:$(this).parent('.place-row').find('td.old_name')});

				}

			});

			if (results) {

				html = '';

				$.each(results, function(index, val) {

					 html += '<tr style="background: #eaeaea;"><th scope="row" style="font-size: 20px;" class="delimeter" data-letter='+index+'>'+index+'</th><td></td><td></td></tr>';

					 if (val.length) {

					 	$.each(val, function(indexPlace, valPlace) {

					 		html += '<tr class="place-row" ><th scope="row"></th><td >'+valPlace.old_name.text().replace(search, '<b>'+search+'</b>')+'</td><td>'+valPlace.new_name.text().replace(search, '<b>'+search+'</b>')+'</td></tr>';

					 	});

					 }
				});
				
				if (html) {

					console.log(html)

					$('.readyTable').find('tbody').html(html);

				}
			}

		}else{
			$('.readyTable').find('tbody').html(currentHtml);
		}

	});

});