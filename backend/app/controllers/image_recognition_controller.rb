class ImageRecognitionController < ApplicationController
    def create
    # require "google/cloud/vision"
    pp params[:image]
    @uploader = PicUploader.new
    @uploader.store!(params[:image])
    image_annotator = Google::Cloud::Vision::ImageAnnotator.new
    file_name = "./public/uploads/#{params[:image].original_filename}"
    pp file_name
    @response = image_annotator.text_detection image: file_name
    render json: @response
    # pp response
    # render json: {result: response.to_json}
    # send_data("/Users/nikita/budget-app/backend/public/uploads/#{params[:id]}.jpg",:type => 'image/jpeg')
    end
end
