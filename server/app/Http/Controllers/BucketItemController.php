<?php

namespace App\Http\Controllers;

use App\Models\bucketItem;
use Illuminate\Http\Request;

class BucketItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
      $validated = $request->validate(([
        'bucketId'=> 'required|exists:buckets,id',
        'itemId'=> 'required|exists:items,id'
      ]));

      $bucketItem = bucketItem::create([
        'bucket_id' => $validated['bucketId'],
        'item_id' => $validated ['itemId']
      ]);

      return response()->json($bucketItem, 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(bucketItem $bucketItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(bucketItem $bucketItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, bucketItem $bucketItem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(bucketItem $bucketItem)
    {
        $bucketItem->delete();
        return response()->json(null, 204);
    }
}
