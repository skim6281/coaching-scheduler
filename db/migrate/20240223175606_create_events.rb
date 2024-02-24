class CreateEvents < ActiveRecord::Migration[7.1]
  def change
    create_table :events do |t|
      t.references :student, null: false, foreign_key: { to_table: :users }, index: true
      t.references :availability, null: false, foreign_key: true, index: true
      t.string :name

      t.timestamps
    end
  end
end
