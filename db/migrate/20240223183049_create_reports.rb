class CreateReports < ActiveRecord::Migration[7.1]
  def change
    create_table :reports do |t|
      t.text :notes
      t.references :event, null: false, foreign_key: true, index: true
      t.integer :score, null: false

      t.timestamps
    end
  end
end
