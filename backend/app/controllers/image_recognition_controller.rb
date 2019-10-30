class ImageRecognitionController < ApplicationController
    def create
        pp params["image_recognition"]["image"]
    end
end
