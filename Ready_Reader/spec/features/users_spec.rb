require 'rails_helper'

feature 'ability to access home page' do

  scenario 'when user visits root path' do
    visit root_path
  end

end

feature 'ability to sign up as a user' do

  scenario 'user fills out sign up form without errors' do
    visit root_path
    fill_in 'Name', with: 'Ben Brostoff'
    fill_in 'Email', with: 'ben.brostoff@gmail.com'
    fill_in 'Password', with: 'test'
    fill_in 'Password Confirmation', with: 'test'
    click_button 'Sign Up'

    user = User.find_by_email('ben.brostoff@gmail.com')

    expect(current_path).to eq(profile_path(user))
  end

  scenario 'user fills out sign up form with errors' do
    visit root_path
    fill_in 'Name', with: 'Ben Brostoff'
    fill_in 'Password', with: 'test'
    fill_in 'Password Confirmation', with: 'test'
    click_button 'Sign Up'

    expect(current_path).to eq(root_path)
   # expect(page).to have_content("Failed")
  end

end

feature 'ability to sign in as an existing user' do

  let(:user) { FactoryGirl.create :user }

  scenario 'existing user fills out sign in form without errors' do
    visit root_path
    fill_in 'Email', with: user.email
    fill_in 'Password', with: "test"
    click_button 'Log In'

    expect(current_path).to eq(profile_path(user))
  end

  scenario 'existing user fills out sign in with invalid credentials' do
    visit root_path
    click_link 'Log In'
    fill_in 'Email', with: user.email
    fill_in 'Password', with: "test2"
    click_button 'Log In'

    expect(current_path).to eq(root_path)
    #expect(page).to have_content("Invalid credentials!")
  end

end

feature 'ability to log out as an existing user' do

  let(:user) { FactoryGirl.create :user }

  scenario 'existing user signs out by clicking on sign out link' do
    visit root_path
    click_link 'Log In'
    fill_in 'Email', with: user.email
    fill_in 'Password', with: "test"
    click_button 'Log In'
    click_link 'Sign Out'
    expect(current_path).to eq(root_path)
  end

end
