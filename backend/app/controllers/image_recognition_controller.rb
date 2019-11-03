class ImageRecognitionController < ApplicationController
    def create

    require "pry"
    pp params[:image]
    @uploader = PicUploader.new
    @uploader.store!(params[:image])
    image_annotator = Google::Cloud::Vision::ImageAnnotator.new
    pp params[:image].original_filename
    file_name = "./public/uploads/#{params[:image].original_filename}"
    pp "FILE NAME"
    pp file_name
    @response = image_annotator.text_detection image: file_name
    # pp @response.full_text_annotation
    render json: @response
    # pp response
    # render json: {result: response.to_json}
    # send_data("/Users/nikita/budget-app/backend/public/uploads/#{params[:id]}.jpg",:type => 'image/jpeg')
    end
end
