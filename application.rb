require "rubygems"
require "bundler"
require 'active_support/json'

module Cchat
  class Application
    def self.root(path = nil)
      @_root ||= File.expand_path(File.dirname(__FILE__))
      path ? File.join(@_root, path.to_s) : @_root
    end

    def self.env
      @_env ||= ENV['RACK_ENV'] || 'development'
    end

    def self.routes
      @_routes ||= eval(File.read('./config/routes.rb'))
    end

    # Initialize the application
    def self.initialize!
      Cramp::Websocket.backend = :thin
      #Thin::Logging.trace = true
      Thin::Logging.debug = :log
    end

  end
end


Bundler.require(:default, Cchat::Application.env)

# Preload application classes
Dir['./app/**/*.rb'].each {|f| require f}
