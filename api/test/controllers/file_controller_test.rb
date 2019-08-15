require 'test_helper'

class FileControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get file_index_url
    assert_response :success
  end

end
