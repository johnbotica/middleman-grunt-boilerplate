require 'base64'

module AssetHelpers
  def asset_host
    build? ? "#{ENV['ASSET_HOST']}" : "#{Socket.ip_address_list.find { |ai| ai.ipv4? && !ai.ipv4_loopback? }.ip_address}:5678"
  end

  def asset_url(filename)
    return filename if /(https?\:)?\/\//.match(filename)
    asset_host.blank? ? "#{filename}" : "//#{asset_host}#{filename}"
  end

  def base64_svg(filename, options={})
    Base64.urlsafe_encode64("#{embedded_svg(filename, options)}")
  end

  def embedded_svg(filename, options={})
    real_path = filename.dup
    real_path = File.join(config[:source], config[:images_dir], real_path) unless real_path.start_with?('/')

    return nil if !File.file?(real_path)

    file = File.open(real_path)

    # Allow specification of a number only to imply px units
    [:width, :height].each do |dimension|
      options[dimension] = "#{options[dimension]}px" if /^(?<num>\d+)$/ =~ "#{options[dimension]}"
    end

    begin
      doc = Nokogiri::HTML::DocumentFragment.parse file.read
      svg = doc.at_css "svg"

      [:class, :width, :height, :id, :preserveAspectRatio].each do |option|
        svg["#{option}"] = options[option] if options[option].present?
      end

      svg
    end
  end

  def lazy_img(src, options={})
    options[:class] = "#{options[:class]} loading"

    if options[:width]
      unit = "#{options[:width]}".sub("#{options[:width].to_i}", "")
      unit = "px" if unit.blank?
      options[:style] = "max-width: #{options[:width]}#{unit}"
    end

    tag(:img, {src: "data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==", data: { src: src }}.merge(options)) +
    content_tag(:noscript) do
      tag(:img, {src: src}.merge(options.slice(:width, :height, :style)))
    end
  end
end
