class IssuesController < ApplicationController
  def index
    issues = Issue.all
    render json: issues
  end

  def create
    issue = Issue.create(issue_params)
    render json: issue
  end

  def destroy
    issue = Issue.find(params[:id])
    issue.destroy
    head :no_content
  end

  private

  def issue_params
    params.require(:issue).permit(:title, :description)
  end
end