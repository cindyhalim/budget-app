class AddHpToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :hp, :integer, :default => 100
    add_column :users, :coins, :integer, :default => 20
    add_column :users, :date_last_checked, :date, :default => "2000-01-01"
  end
end
