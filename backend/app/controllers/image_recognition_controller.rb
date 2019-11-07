class ImageRecognitionController < ApplicationController
    def create

    # pp params[:image]
    # @uploader = PicUploader.new
    # @uploader.store!(params[:image])
    # image_annotator = Google::Cloud::Vision::ImageAnnotator.new
    # pp params[:image].original_filename
    # file_name = './public/uploads/#{params[:image].original_filename}'
    # pp file_name
    # @response = image_annotator.text_detection image: file_name
    # render json: {success:"true"}
    end
end
