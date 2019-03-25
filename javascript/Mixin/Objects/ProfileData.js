export const profileLabel = {
  study: {
    'early_morning': 'Early in the morning',
    'morning_afternoon': 'In the morning and early afternoon',
    'afternoon_evening': 'In the afternoon and early evening',
    'evening': 'In the evening',
    'late_night': 'Late at night'
  },
  wake_time: {
    'six_or_earlier': 'Before 6:00AM',
    'six_to_eight': 'Between 6:00AM and 8:00AM',
    'eight_to_ten': 'Between 8:00AM and 10:00AM',
    'ten_to_noon': 'Between 10:00AM and Noon',
    'noon_or_later': 'Between Noon or later'
  },
  sleep_time: {
    'eight_or_earlier': '8:00pm or earlier',
    'eight_to_ten': '8:00pm to 10:00pm',
    'ten_to_midnight': '10:00pm to midnight',
    'after_midnight': 'After midnight'
  },
  focus: {
    'academic': 'My academic and intellectual growth',
    'relationships': 'The friends and relationships I create at college',
    'both': 'Both my academics and relationships equally'
  },
  free_time: {
    'go_out': 'I like to go out with friends',
    'stay_in_friends': 'I like to stay in with friends',
    'time_alone': 'I like relaxing alone'
  },
  pets: {
    'none': 'I do not want pets',
    'want': 'Do not have a pet, but want one',
    'have': 'I have a pet',
    'accept': 'I can room with someone with a pet'
  },
  smoking: {
    'never': 'I never smoke',
    'sometimes': 'I sometimes smoke',
    'outside': 'I smoke, but do so outside',
    'inside': 'I smoke inside'
  },
  ordering: {
    'desc' : 'Show newest first',
    'asc' : 'Show oldest first'
  }
}

class ProfileData {

  static listHobbies() {
    return [
      {
        value: 'arts_and_crafts',
        label: 'Arts and Crafts'
      }, {
        value: 'books_and_reading',
        label: 'Books and Reading'
      }, {
        value: 'cars',
        label: 'Cars'
      }, {
        value: 'church_activities',
        label: 'Church Activities'
      }, {
        value: 'collecting',
        label: 'Collecting'
      }, {
        value: 'computers_and_technology',
        label: 'Computers and Technology'
      }, {
        value: 'dancing',
        label: 'Dancing'
      }, {
        value: 'fashion',
        label: 'Fashion'
      }, {
        value: 'fine_arts',
        label: 'Fine Arts'
      }, {
        value: 'gardening',
        label: 'Gardening'
      }, {
        value: 'games',
        label: 'Games'
      }, {
        value: 'humor',
        label: 'Humor'
      }, {
        value: 'investing_personal_finance',
        label: 'Investing/Personal Finance'
      }, {
        value: 'movies',
        label: 'Movies'
      }, {
        value: 'music',
        label: 'Music'
      }, {
        value: 'outdoor_activities',
        label: 'Outdoor Activities'
      }, {
        value: 'pets_and_animals',
        label: 'Pets and Animals'
      }, {
        value: 'photography',
        label: 'Photography'
      }, {
        value: 'politics',
        label: 'Politics'
      }, {
        value: 'sports',
        label: 'Sports'
      }, {
        value: 'travel',
        label: 'Travel'
      }, {
        value: 'tv_shows',
        label: 'TV Shows'
      }, {
        value: 'volunteering',
        label: 'Volunteering'
      }, {
        value: 'writing',
        label: 'Writing'
      }, {
        value: 'rotc',
        label: 'Military / ROTC'
      }
    ]
  }

  static listStudyTimes()
  {
    return [
      {
        value: 'early_morning',
        label: 'Early in the morning'
      }, {
        value: 'morning_afternoon',
        label: 'In the morning and early afternoon'
      }, {
        value: 'afternoon_evening',
        label: 'In the afternoon and early evening'
      }, {
        value: 'evening',
        label: 'In the evening'
      }, {
        value: 'late_night',
        label: 'Late at night'
      }
    ]
  }

  static listWakeTimes() {
    return [
      {
        value: 'six_or_earlier',
        label: 'Before 6:00AM'
      }, {
        value: 'six_to_eight',
        label: 'Between 6:00AM and 8:00AM'
      }, {
        value: 'eight_to_ten',
        label: 'Between 8:00AM and 10:00AM'
      }, {
        value: 'ten_to_noon',
        label: 'Between 10:00AM and Noon'
      }, {
        value: 'noon_or_later',
        label: 'Between Noon or later'
      }
    ]
  }

  static listSleepTimes() {
    return [
      {
        value: 'eight_or_earlier',
        label: '8:00pm or earlier'
      }, {
        value: 'eight_to_ten',
        label: '8:00pm to 10:00pm'
      }, {
        value: 'ten_to_midnight',
        label: '10:00pm to midnight'
      }, {
        value: 'after_midnight',
        label: 'After midnight'
      }
    ]
  }

  static listPolitics() {
    return [
      {
        value: 'very_liberal',
        label: 'Very liberal'
      }, {
        value: 'somewhat_liberal',
        label: 'Somewhat liberal'
      }, {
        value: 'moderate',
        label: 'Moderate'
      }, {
        value: 'somewhat_conservative',
        label: 'Somewhat conservative'
      }, {
        value: 'very_conservative',
        label: 'Very conservative'
      }
    ]
  }

  static listLanguages() {
    return [
      {
        value: 'Arabic',
        label: 'Arabic'
      }, {
        value: 'Bengali',
        label: 'Bengali'
      }, {
        value: 'Chinese',
        label: 'Chinese'
      }, {
        value: 'English',
        label: 'English'
      }, {
        value: 'French',
        label: 'French'
      }, {
        value: 'German',
        label: 'German'
      }, {
        value: 'Hindi',
        label: 'Hindi'
      }, {
        value: 'Italian',
        label: 'Italian'
      }, {
        value: 'Japanese',
        label: 'Japanese'
      }, {
        value: 'Javanese',
        label: 'Javanese'
      }, {
        value: 'Korean',
        label: 'Korean'
      }, {
        value: 'Malay',
        label: 'Malay'
      }, {
        value: 'Marathi',
        label: 'Marathi'
      }, {
        value: 'Portuguese',
        label: 'Portuguese'
      }, {
        value: 'Punjabi',
        label: 'Punjabi'
      }, {
        value: 'Russian',
        label: 'Russian'
      }, {
        value: 'Spanish',
        label: 'Spanish'
      }, {
        value: 'Tamil',
        label: 'Tamil'
      }, {
        value: 'Telugu',
        label: 'Telugu'
      }, {
        value: 'Vietnamese',
        label: 'Vietnamese'
      }
    ]
  }

  static listOvernighter() {
    return [
      {
        value: 'Often',
        label: 'Often'
      },
      {
        value: 'Occasionally',
        label: 'Occasionally'
      }, {
        value: 'Rarely',
        label: 'Rarely'
      }, {
        value: 'Never',
        label: 'Never'
      }
    ]
  }

  static listMusic() {
    return [
      {
        value: 'alternative',
        label: 'Alternative'
      }, {
        value: 'ambient',
        label: 'Ambient'
      }, {
        value: 'beach',
        label: 'Beach'
      }, {
        value: 'bluegrass',
        label: 'Bluegrass'
      }, {
        value: 'blues',
        label: 'Blues'
      }, {
        value: 'religious',
        label: 'Religious'
      }, {
        value: 'classical',
        label: 'Classical'
      }, {
        value: 'classic_rock',
        label: 'Classic Rock'
      }, {
        value: 'country',
        label: 'Country'
      }, {
        value: 'electronic',
        label: 'Electronic'
      }, {
        value: 'folk',
        label: 'Folk'
      }, {
        value: 'heavy_metal',
        label: 'Heavy metal'
      }, {
        value: 'hip_hop',
        label: 'Hip hop'
      }, {
        value: 'house',
        label: 'House'
      }, {
        value: 'industrial',
        label: 'Industrial'
      }, {
        value: 'jazz',
        label: 'Jazz'
      }, {
        value: 'popular_music',
        label: 'Popular music'
      }, {
        value: 'progressive',
        label: 'Progressive'
      }, {
        value: 'punk',
        label: 'Punk'
      }, {
        value: 'r_and_b',
        label: 'R&B'
      }, {
        value: 'rap',
        label: 'Rap'
      }, {
        value: 'reggae',
        label: 'Reggae'
      }, {
        value: 'rock',
        label: 'Rock'
      }, {
        value: 'world_music',
        label: 'World music'
      }
    ]
  }

  static listFreeTime() {
    return [
      {
        value: 'go_out',
        label: 'I like to go out with friends'
      }, {
        value: 'stay_in_friends',
        label: 'I like to stay in with friends'
      }, {
        value: 'time_alone',
        label: 'I like relaxing alone'
      }
    ]
  }

  static listLoudness() {
    return [
      {
        value: 'very_loud',
        label: 'I am pretty loud'
      }, {
        value: 'loud',
        label: 'I can get loud'
      }, {
        value: 'average',
        label: 'I do not get loud'
      }, {
        value: 'quiet',
        label: 'I am quiet'
      }, {
        value: 'very_quiet',
        label: 'I am very quiet'
      }
    ]
  }

  static listCleanliness() {
    return [
      {
        value: 'very_messy',
        label: 'Messy and disorganized'
      }, {
        value: 'messy',
        label: 'Somewhat messy and disorganized'
      }, {
        value: 'average',
        label: 'Fairly clean'
      }, {
        value: 'clean',
        label: 'Quite clean and tidy'
      }, {
        value: 'very_clean',
        label: 'Very clean and very tidy'
      }
    ]
  }

  static listSmoking() {
    return [
      {
        value: 'never',
        label: 'I never smoke'
      }, {
        value: 'sometimes',
        label: 'I sometimes smoke'
      }, {
        value: 'outside',
        label: 'I smoke, but do so outside'
      }, {
        value: 'inside',
        label: 'I smoke inside'
      }
    ]
  }

  static listPets() {
    return [
      {
        value: 'none',
        label: 'I do not want pets'
      }, {
        value: 'want',
        label: 'Do not have a pet, but want one'
      }, {
        value: 'have',
        label: 'I have a pet'
      }, {
        value: 'accept',
        label: 'I can room with someone with a pet'
      }
    ]
  }

  static listFocus() {
    return [
      {
        value: 'academic',
        label: 'My academic and intellectual growth'
      }, {
        value: 'relationships',
        label: 'The friends and relationships I create at college'
      }, {
        value: 'both',
        label: 'Both my academics and relationships equally'
      }
    ]
  }

}

export default ProfileData
