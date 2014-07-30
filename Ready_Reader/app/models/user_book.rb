class UserBook < ActiveRecord::Base
  belongs_to :user
  belongs_to :book

  def local_storage_comp(user_id, local_val)
    p local_val.class
    self.farthest_point = local_val.to_i if local_val.to_i > self.farthest_point
    save_point = self.farthest_point if user_id != 1
    save_point = local_val if user_id == 1
    self.save!
    return save_point
  end

end


