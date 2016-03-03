window.addEventListener('load', function() {

	window.addEventListener('keyup', function(e) {
		if($('#city-input').is(':focus')) {
			$.ajax({
				url: 'http://ec2-52-87-224-87.compute-1.amazonaws.com:3000/getcity/?q=' + $('#city-input').val(),
				dataType: 'jsonp',
				success: function(data) {
					$('#suggestions').html('');
					for(var i = 0; i < data.length; i++) {
						var name = data[i].city;
						$('#suggestions').append('<li>' + name +'</li>');
					}
				},
				error: function(xhr, status, error) {
					$('#suggestions').html('');
				}
			});
		}
	});

	$('#submit-button').click(function(e) {
		e.preventDefault();
		$('#city-text-area').text($('#city-input').val());
		$.ajax({
			url: 'https://api.wunderground.com/api/5079f621cbe4f46e/geolookup/conditions/q/UT/' + $('#city-input').val() + '.json',
			dataType: 'jsonp',
			success: function(data) {
				var obs = data.current_observation;
				var location = obs.observation_location.full;
				var weather = obs.weather;
				var temperature = obs.temperature_string;
				var feelsLike = obs.feelslike_string;
				$('#location').text(location);
				$('#weather').text(weather);
				$('#temperature').text(temperature);
				$('#feels-like').text(feelsLike);
			},
		});
	});

	$('#sum-submit').click(function(e) {
		e.preventDefault();
		$.ajax({
			url: 'http://ec2-52-87-224-87.compute-1.amazonaws.com:3000/sum/?nums=' + $('#sum-input').val(),
			dataType: 'jsonp',
			success: function(data) {
				$('#sum').text(data.sum);
			},
			error: function(xhr, status, error) {
				$('#sum').text('Sorry, there was an error summing your numbers.');
			},
		});
	});

	$.ajax({
		url: 'http://api.icndb.com/jokes/random?exclude=[explicit]&limitTo=[nerdy]',
		dataType: 'json',
		success: function(data) {
			$('#chuck').text(data.value.joke);
		},
		error: function(xhr, status, error) {
			$('#chuck').text('Sorry, it looks like the Internet Chuck Norris Database is down.');			
		},
	});

});
