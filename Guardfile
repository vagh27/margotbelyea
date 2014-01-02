# A sample Guardfile
# More info at https://github.com/guard/guard#readme

# This will concatenate the javascript files specified in :files to public/js/all.js
guard :concat, type: "js", files: %w(), input_dir: "public/js", output: "public/js/all"

guard :concat, type: "css", files: %w(), input_dir: "public/css", output: "public/css/all"

guard 'livereload' do
  watch(%r{app/views/.+\.(erb|haml|slim)$})
  watch(%r{app/helpers/.+\.rb})
  watch(%r{public/.+\.(css|js|html)})
  watch(%r{config/locales/.+\.yml})
  # Rails Assets Pipeline
  watch(%r{(app|vendor)(/assets/\w+/(.+\.(css|js|html))).*}) { |m| "/assets/#{m[3]}" }
end

guard 'sass', :input => 'sass', :output => 'css'

guard 'sass', :input => 'sass', :output => 'css'

guard 'uglify', :destination_file => "public/javascripts/application.js" do
  watch (%r{app/assets/javascripts/application.js})
end
