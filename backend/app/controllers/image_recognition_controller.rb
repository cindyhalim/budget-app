class ImageRecognitionController < ApplicationController
    def create
    require "google/cloud/vision"
    image_annotator = Google::Cloud::Vision::ImageAnnotator.new
    @uploader = PicUploader.new
    pp params[:image]
    # @uploader.store!(params[:image])
    # redirect_to "http://localhost:5000/picture/?file=#{@uploader.identifier}"
    # image_annotator = Google::Cloud::Vision::ImageAnnotator.new
    # file_name = "/Users/nikita/budget-app/backend/public/uploads/#{params[:id]}.jpg"
    # response = image_annotator.text_detection image: file_name
    # render json: {result: response.to_json}
    # send_data("/Users/nikita/budget-app/backend/public/uploads/#{params[:id]}.jpg",:type => 'image/jpeg')
    end
end
