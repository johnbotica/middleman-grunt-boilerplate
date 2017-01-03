module MetaHelpers
  def full_title(string = nil)
    (string || "Online Training Software") + " | LMS by Mindflash"
  end

  def uniq_id
    SecureRandom.hex(4)
  end
end
