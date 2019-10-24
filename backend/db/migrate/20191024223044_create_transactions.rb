class CreateTransactions < ActiveRecord::Migration[6.0]
  def change
    create_table :transactions do |t|
      t.references :user, index: true, foreign_key: true
      t.decimal :amount
      t.string :category
      t.string :location
      t.timestamps
    end
  end
end
