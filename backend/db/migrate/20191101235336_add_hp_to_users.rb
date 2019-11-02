class AddHpToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :hp, :integer, :default => 100
    add_column :users, :coins, :integer, :default => 20
  end
end
