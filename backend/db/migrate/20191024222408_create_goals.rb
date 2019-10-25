class CreateGoals < ActiveRecord::Migration[6.0]
  def change
    create_table :goals do |t|
      t.datetime :end_date
      t.string :type
      t.decimal :amount
      t.string :name
      t.references :user, index: true, foreign_key: true
      t.timestamps
    end
  end
end
