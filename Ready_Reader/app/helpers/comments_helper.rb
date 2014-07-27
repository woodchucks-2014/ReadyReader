module CommentsHelper

 def datetime_am_pm(date)
  time = date.in_time_zone("Eastern Time (US & Canada)")
    if time.strftime("%I:%M%p")[0] == "0"
      return time.strftime("%I:%M%p")[1..-1]
    end
    date.to_s[0..9] + " at " + time.strftime("%I:%M%p")
  end

end
